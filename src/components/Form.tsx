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
  const { register, handleSubmit, watch, unregister, reset, formState } = form;
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
        console.log({ response });
      })
      .catch(function (error) {
        setIsSending(false);
        setError(true);
      });

    reset();
  };

  return (
    <>
      {!isSending && !error && !success && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Dish Name
            </label>
            <input
              type="text"
              id="dish-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=" "
              {...register("name", { required: "Dish name is required" })}
            />

            <p>{errors.name?.message}</p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="preparation_time"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Preparation Time
            </label>
            <input
              type="time"
              id="preparation-time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              step="2"
              {...register("preparation_time", {
                required: "Preparation time is required",
              })}
            />

            <p className="text-xs text-red-600">
              {errors.preparation_time?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Dish type:
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          </div>

          {watchType === "pizza" && (
            <>
              <div className="mb-6">
                <label
                  htmlFor="no_of_slices"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Number of slices:
                </label>
                <input
                  type="number"
                  id="number-of-slices"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("no_of_slices", {
                    min: 1,
                    required: "Number of slices is required",
                  })}
                />
                <p>{errors.no_of_slices?.message}</p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="diameter"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Diameter:
                </label>
                <input
                  type="number"
                  id="diameter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("diameter", {
                    required: "Diameter is required",
                  })}
                  step="0.01"
                />
                <p>{errors.diameter?.message}</p>
              </div>
            </>
          )}
          {watchType === "soup" && (
            <div className="mb-6">
              <label
                htmlFor="spiciness_scale"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Spicyness scale (1-10):
              </label>
              <input
                type="number"
                id="spicyness-scale"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("spiciness_scale", {
                  min: 1,
                  max: 10,
                  required: "Spicyness scale is required",
                })}
              />
              <p>{errors.spiciness_scale?.message}</p>
            </div>
          )}
          {watchType === "sandwich" && (
            <div className="mb-6">
              <label
                htmlFor="slices_of_bread"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Slices of bread:
              </label>
              <input
                type="number"
                id="slices-of-bread"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("slices_of_bread", {
                  required: "this field is required",
                })}
              />
              <p>{errors.slices_of_bread?.message};</p>
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600"
          >
            Add
          </button>
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
