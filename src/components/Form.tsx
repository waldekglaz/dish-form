import React from "react";
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
  const { register, control, handleSubmit, watch } = form;
  const onSubmit = (data: any) => {
    console.log("submitted", data);
  };
  const watchType = watch("type");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Dish name:</label>
        <input type="text" id="name" {...register("name")} />
        <label htmlFor="preparation_time">Preparation time:</label>
        <input
          type="time"
          id="preparation-time"
          step="2"
          {...register("preparation_time")}
        />
        <label htmlFor="type">
          Dish type:
          <select {...register("type")}>
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
                {...register("no_of_slices")}
              />
            </label>
            <label htmlFor="diameter">
              Diameter:
              <input
                type="number"
                id="diameter"
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
