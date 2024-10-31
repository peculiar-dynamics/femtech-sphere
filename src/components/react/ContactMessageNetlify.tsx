import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const encode = (data: any) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function ContactMessageNetlify() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: Inputs, e: any) => {
    // netlify
    e.preventDefault();
    const form = e.target;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contactForm",
        ...data,
      }),
    })
      .then((response) => {
        console.log("success!");

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const characterCount = watch("message")?.length;

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      id="contactForm"
      name="contactForm"
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full flex-col items-center justify-center gap-4"
      data-netlify="true"
      netlify-honeypot="bot-field"
      method="POST"
    >
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      {isSubmitSuccessful && (
        <div
          id="success-message"
          className="absolute z-20 flex h-full w-full flex-col items-center justify-center rounded-md bg-[--surface-container-low] p-4 text-center shadow-md"
        >
          <Icon
            icon="mdi:success-circle-outline"
            className="text-4xl text-green-300"
          />
          <h2 className="text-2xl font-semibold capitalize lg:text-3xl">
            Thank You!
          </h2>
          <p className="mb-4">
            Your message has been received and we will get back to you ASAP.
          </p>
          <button
            className="button tonal size-small w-fit"
            type="reset"
            onClick={() => {
              reset();
            }}
          >
            Reset Form
          </button>
        </div>
      )}
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="contact-name" className="sr-only">
          Full Name
        </label>
        <input
          {...register("name", {
            required: "Your Name is required",
            minLength: {
              value: 2,
              message: "Name is required",
            },
            maxLength: { value: 60, message: "Your name is too long!" },
          })}
          aria-invalid={errors.name ? "true" : "false"}
          placeholder={"Full Name"}
          className="w-full rounded-md border-2 px-4  py-3 outline-none "
          autoComplete="name"
          disabled={isSubmitting || isSubmitSuccessful}
          id="contact-name"
        />
        <p className="w-full text-sm font-medium text-[--error]">
          {errors.name?.message}
        </p>
      </div>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="contact-email" className="sr-only">
          Email Address
        </label>
        <input
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          placeholder="Email Address"
          className="w-full rounded-md border-2 px-4 py-3 outline-none"
          autoComplete="email"
          disabled={isSubmitting || isSubmitSuccessful}
          id="contact-email"
        />
        <p className="w-full text-sm font-medium text-[--error]">
          {errors.email?.message}
        </p>
      </div>
      <div className=" flex w-full flex-col gap-1">
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          {...register("message", {
            required: "A Message is required",
            minLength: {
              value: 20,
              message: "Please enter a message more than 20 characters long",
            },
            maxLength: {
              value: 1500,
              message: "Please enter a message less than 1500 characters",
            },
          })}
          aria-invalid={errors.message ? "true" : "false"}
          placeholder="Let us know how we can help!"
          className="h-36 w-full rounded-md border-2  px-4 py-3 outline-none "
          disabled={isSubmitting || isSubmitSuccessful}
          id="contact-message"
        />
        <div className="flex w-full max-w-full items-start justify-between gap-4">
          <p className="w-fit text-sm font-medium text-[--error]">
            {errors.message?.message}
          </p>
          <p
            className={`w-fit flex-none text-right text-sm ${
              (characterCount > 1500 && "text-[--error]") ||
              (characterCount < 20 && errors.message && "text-[--error]")
            }`}
          >
            {characterCount || 0}/1500
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="button w-fit"
        aria-live="assertive"
        disabled={isSubmitting || isSubmitSuccessful}
      >
        {isSubmitting ? (
          <span
            className="btnSubmit-text tonal inline-flex w-full items-center justify-center gap-2"
            aria-label="Sending message, please wait..."
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width={96}
              height={96}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"
              ></path>
            </svg>
            Sending
          </span>
        ) : isSubmitSuccessful ? (
          <span className="btnSubmit-text disabled inline-flex items-center justify-center py-2 px-6 rounded-sm gap-2">
            Message Sent
          </span>
        ) : (
          <span className="btnSubmit-text filled inline-flex py-2 px-6 items-center justify-center rounded-sm gap-2">
            Send Message
          </span>
        )}

        <span
          className="js-loadingMsg sr-only"
          data-loading-msg="Sending message, wait..."
        ></span>
      </button>

      <div className="inline-flex w-full flex-wrap items-center justify-center gap-1 whitespace-nowrap text-center text-xs text-[--onSurfaceVariant] sm:text-left">
        Check out our
        <a href="/policies/privacy" className=" text-[--tertiary] underline">
          Privacy Policy
        </a>
        for how we use your data.
      </div>
    </form>
  );
}
