import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import InputField from "./InputField";
import InputSelect from "./InputSelect";
import ErrorMessage from "./ErrorMessage";
import Message from "./Message";
import Spinner from "./Spinner";
import Button from "./Button";
import axios from "axios";

type FormValues = {
  name: string;
  type: string;
  preparation_time: string;
  no_of_slices: string;
  diameter: string;
  spiciness_scale: string;
  slices_of_bread: string;
  attr: string;
};
const dishTypes = [
  { type: "pizza", attr: ["no_of_slices", "diameter"] },
  { type: "soup", attr: ["spiciness_scale"] },
  { type: "sandwich", attr: ["slices_of_bread"] },
];
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
const Form = () => {
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [responseMsg, setResponseMsg] = useState(Object);

  const form = useForm<FormValues>(defaultValues);
  const { register, handleSubmit, watch, unregister, reset, formState } = form;
  const watchType = watch("type");
  const { errors } = formState;
  useEffect(() => {
    if (watchType === "pizza") {
      register("no_of_slices");
      register("diameter");
    } else {
      unregister("no_of_slices");
      unregister("diameter");
    }
    if (watchType === "soup") {
      register("spiciness_scale");
    } else {
      unregister("spiciness_scale");
    }
    if (watchType === "sandwich") {
      register("slices_of_bread");
    } else {
      unregister("slices_of_bread");
    }
  }, [register, unregister, watchType]);
  const onSubmit = async (data: FormValues) => {
    setIsSending(true);
    const url =
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/";
    try {
      const response = await axios.post(url, {
        ...data,
      });
      setIsSending(false);
      setSuccess(true);
      setResponseMsg(response.data);
      console.log("Response :", response.data);
    } catch (error) {
      setIsSending(false);
      setError(true);
    }

    reset();
  };

  return (
    <>
      {!isSending && !error && !success && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-xs mx-auto p-4"
        >
          <FormField>
            <InputField
              htmlFor="name"
              label="Dish Name"
              register={register("name", { required: "Dish name is required" })}
              type="text"
            >
              {errors.name?.message && (
                <ErrorMessage message={errors.name?.message} />
              )}
            </InputField>
          </FormField>

          <FormField>
            <InputField
              htmlFor="preparation_time"
              label="Preparation Time"
              type="time"
              step="2"
              register={register("preparation_time", {
                required: "Preparation time is required (hh:mm:ss)",
              })}
            >
              {errors.preparation_time?.message && (
                <ErrorMessage message={errors.preparation_time?.message} />
              )}
            </InputField>
          </FormField>
          <FormField>
            <InputSelect
              htmlFor="type"
              label="Dish type:"
              register={register("type", { required: "Dish type is required" })}
              dishes={dishTypes}
            />
            {errors.type?.message && (
              <ErrorMessage message={errors.type?.message} />
            )}
          </FormField>

          {watchType === "pizza" && (
            <>
              <FormField>
                <InputField
                  htmlFor="no_of_slices"
                  label="Number of slices:"
                  type="number"
                  register={register("no_of_slices", {
                    min: 1,
                    required: "Number of slices is required",
                  })}
                >
                  {errors.no_of_slices?.message && (
                    <ErrorMessage message={errors.no_of_slices?.message} />
                  )}
                </InputField>
              </FormField>
              <FormField>
                <InputField
                  htmlFor="diameter"
                  label="Diameter:"
                  type="number"
                  step="0.01"
                  register={register("diameter", {
                    required: "Diameter is required",
                  })}
                >
                  {errors.diameter?.message && (
                    <ErrorMessage message={errors.diameter?.message} />
                  )}
                </InputField>
              </FormField>
            </>
          )}
          {watchType === "soup" && (
            <FormField>
              <InputField
                htmlFor="spiciness_scale"
                label="Spicyness scale (1-10):"
                type="number"
                register={register("spiciness_scale", {
                  required:
                    "Spicyness scale is required (1 - super mild, 10 - super hot)",
                  validate: (fieldValue) => {
                    return (
                      (Number(fieldValue) > 0 && Number(fieldValue) <= 10) ||
                      "Please enter number between 1 and 10"
                    );
                  },
                })}
              >
                {errors.spiciness_scale?.message && (
                  <ErrorMessage message={errors.spiciness_scale?.message} />
                )}
              </InputField>
            </FormField>
          )}
          {watchType === "sandwich" && (
            <FormField>
              <InputField
                htmlFor="slices_of_bread"
                label="Slices of bread:"
                type="number"
                register={register("slices_of_bread", {
                  required: "We need to know how many bread slices we need",
                  validate: (fieldValue) => {
                    return (
                      Number(fieldValue) > 0 || "You need at least one slice"
                    );
                  },
                })}
              >
                {errors.slices_of_bread?.message && (
                  <ErrorMessage message={errors.slices_of_bread?.message} />
                )}
              </InputField>
            </FormField>
          )}
          <Button inputType="submit" text="Add Dish" />
        </form>
      )}

      {isSending && <Spinner />}
      {error && (
        <Message
          text="Opss Something went wrong! Please try again or contact your administrator."
          success={false}
        >
          <Button
            inputType="button"
            text="Try Again"
            onClick={() => setError(false)}
          />
        </Message>
      )}
      {success && (
        <Message text="Your dish has been sucessfully added." success={true}>
          <pre className="text-left mb-16">
            <code>{JSON.stringify(responseMsg, null, 2)}</code>
          </pre>
          <Button
            inputType="button"
            text="Add another dish"
            onClick={() => setSuccess(false)}
          />
        </Message>
      )}
    </>
  );
};

export default Form;
