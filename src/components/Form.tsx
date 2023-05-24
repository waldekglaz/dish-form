import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Form = () => {
  const form = useForm({
    defaultValues: {
      type: "",
      name: "",
      preparation_time: "",
      no_of_slices: "",
      diameter: "",
      spicyness_scale: "",
      slices_of_bread: "",
    },
  });
  const { register, control, handleSubmit, watch, unregister } = form;
  const watchType = watch("type");
  useEffect(() => {
    if (watchType === "pizza") {
      register("no_of_slices");
      register("diameter");
    } else if (watchType === "soup") {
      register("spicyness_scale");
    } else if (watchType === "sandwich") {
      register("slices_of_bread");
    } else {
      unregister("no_of_slices");
      unregister("diameter");
      unregister("spicyness_scale");
      unregister("slices_of_bread");
    }
  }, [register, unregister, watchType]);
  const onSubmit = (data: any) => {
    console.log("submitted", data);
  };

  return (
    <>
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
          <select {...register("type")} required>
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
            <label htmlFor="spicyness_scale">
              Spicyness scale (1-10):
              <input
                type="number"
                id="spicyness-scale"
                min="1"
                max="10"
                required
                {...register("spicyness_scale")}
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
      <DevTool control={control} />
    </>
  );
};

export default Form;
