import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
  name: string;
  type: string;
  preparation_time: string;
  no_of_slices: string;
  diameter: string;
  spiciness_scale: string;
  slices_of_bread: string;
};

const Form = () => {
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const defaultValues = {
    defaultValues: {
      name: "",
      type: "",
      preparation_time: "",
      no_of_slices: "",
      diameter: "",
      spiciness_scale: "",
      slices_of_bread: "",
    },
  };
  const form = useForm<FormValues>(defaultValues);
  const {
    register,
    control,
    handleSubmit,
    watch,
    unregister,
    reset,
    formState,
  } = form;
  const watchType = watch("type");
  const { errors } = formState;
  useEffect(() => {
    if (watchType === "pizza") {
      register("no_of_slices");
      register("diameter");
    } else if (watchType === "soup") {
      register("spiciness_scale");
    } else if (watchType === "sandwich") {
      register("slices_of_bread");
    } else {
      unregister("no_of_slices");
      unregister("diameter");
      unregister("spiciness_scale");
      unregister("slices_of_bread");
    }
  }, [register, unregister, watchType]);
  const onSubmit = (data: FormValues) => {
    setIsSending(true);
    const url =
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/";

    axios
      .post(url, {
        ...data,
      })
      .then(function (response) {
        setIsSending(false);
        setSuccess(true);
      })
      .catch(function (error) {
        setIsSending(false);
        setError(true);
        console.log(error);
      });

    reset();
  };

  return (
    <>
      {!isSending && !error && !success && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="name">
            Dish name:
            <input
              type="text"
              id="name"
              {...register("name", { required: "Dish name is required" })}
            />
          </label>

          <p>{errors.name?.message}</p>
          <label htmlFor="preparation_time">
            Preparation time:
            <input
              type="time"
              id="preparation-time"
              step="2"
              {...register("preparation_time", {
                required: "Preparation time is required",
              })}
            />
          </label>

          <p>{errors.preparation_time?.message}</p>
          <label htmlFor="type">
            Dish type:
            <select
              required
              {...register("type", { required: "Dish type is required" })}
            >
              <option value="" disabled>
                Choose here
              </option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </select>
            <p>{errors.type?.message}</p>
          </label>
          {watchType === "pizza" && (
            <>
              <label htmlFor="no_of_slices">
                Number of slices:
                <input
                  type="number"
                  id="number-of-slices"
                  required
                  {...register("no_of_slices", {
                    min: 1,
                    required: "Number of slices is required",
                  })}
                />
                <p>{errors.no_of_slices?.message}</p>
              </label>
              <label htmlFor="diameter">
                Diameter:
                <input
                  type="number"
                  id="diameter"
                  {...register("diameter", {
                    required: "Diameter is required",
                  })}
                  step="0.01"
                />
                <p>{errors.diameter?.message}</p>
              </label>
            </>
          )}
          {watchType === "soup" && (
            <>
              <label htmlFor="spiciness_scale">
                Spicyness scale (1-10):
                <input
                  type="number"
                  id="spicyness-scale"
                  {...register("spiciness_scale", {
                    min: 1,
                    max: 10,
                    required: "Spicyness scale is required",
                  })}
                />
              </label>
            </>
          )}
          {watchType === "sandwich" && (
            <>
              <label htmlFor="slices_of_bread">
                Slices of bread:
                <input
                  type="number"
                  id="slices_of_bread"
                  {...register("slices_of_bread", {
                    required: "this field is required",
                  })}
                />
              </label>
              <p>{errors.slices_of_bread?.message};</p>
            </>
          )}
          <button type="submit">Add</button>
        </form>
      )}
      {isSending && <div>Sending data</div>}
      {error && (
        <div>
          Opss Something went wrong! Please try again or contact your
          administrator.
          <br />
          <a href="/">Try again</a>
          <button onClick={() => setError(false)}>reset</button>
        </div>
      )}
      {success && (
        <div>
          Data send succefully. <br />
          {/* <a href="/">Add new data</a> */}
          <button onClick={() => setSuccess(false)}>new</button>
        </div>
      )}
    </>
  );
};

export default Form;
