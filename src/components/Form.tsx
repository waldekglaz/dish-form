import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";

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
  const form = useForm(defaultValues);
  const { register, control, handleSubmit, watch, unregister, reset } = form;
  const watchType = watch("type");
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
  const onSubmit = (data: any) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Dish name:</label>
          <input type="text" id="name" {...register("name")} required />
          <label htmlFor="preparation_time">Preparation time:</label>
          <input
            type="time"
            id="preparation-time"
            step="2"
            required
            {...register("preparation_time")}
          />
          <label htmlFor="type">
            Dish type:
            <select {...register("type", { required: true })}>
              <option value="" disabled>
                Choose here
              </option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </select>
          </label>
          {watchType === "pizza" && (
            <>
              <label htmlFor="no_of_slices">
                Number of slices:
                <input
                  type="number"
                  id="number-of-slices"
                  required
                  {...register("no_of_slices")}
                />
              </label>
              <label htmlFor="diameter">
                Diameter:
                <input
                  type="number"
                  id="diameter"
                  required
                  {...register("diameter")}
                  step="0.01"
                />
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
                  min="1"
                  max="10"
                  required
                  {...register("spiciness_scale", {
                    min: 1,
                    max: 10,
                    required: true,
                  })}
                />
              </label>
            </>
          )}
          {watchType === "sandwich" && (
            <label htmlFor="slices_of_bread">
              Slices of bread:
              <input
                type="number"
                id="slices_of_bread"
                required
                {...register("slices_of_bread")}
              />
            </label>
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
        </div>
      )}
      {success && (
        <div>
          Data send succefully. <br /> <a href="/">Add new data</a>
        </div>
      )}
      <DevTool control={control} />
    </>
  );
};

export default Form;
