import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

type Inputs = {
  email: string;
};

const encode = (data: any) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default function InlineEmailNetlify() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: {
      email: "",
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
        "form-name": "signupForm",
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

  // console.log("errors", errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      id="signupForm"
      name="signupForm"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="flex w-full flex-col relative items-center md:max-w-xl md:items-start"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="signupForm" />

      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <div className=" flex flex-col w-full items-center  justify-start gap-2 sm:flex-row flex-wrap md:gap-3">
        <div className="outline-input">
          <label htmlFor="signup-email" className="sr-only">
            Email Address
          </label>
          <Icon icon="mdi:email" className="pb-0.5" aria-hidden="true" />

          <input
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="Enter your email"
            className="inline-email"
            autoComplete="email"
            disabled={isSubmitting || isSubmitSuccessful}
            id="signup-email"
          />
        </div>

        <button
          type="submit"
          className={`button whitespace-nowrap flex justify-center items-center py-2 px-4 align-middle ${
            isSubmitSuccessful ? "disabled" : "elevated"
          }  `}
          aria-live="assertive"
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {isSubmitting ? (
            <span
              className="btnSubmit-text inline-flex w-full items-center justify-center gap-2"
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
              Subscribe
            </span>
          ) : isSubmitSuccessful ? (
            <span className="btnSubmit-text px-2">Success!</span>
          ) : (
            <span className="btnSubmit-text  px-2 ">Subscribe</span>
          )}
          <span
            className="js-loadingMsg sr-only"
            data-loading-msg="Sending message, wait..."
          ></span>
        </button>
      </div>
      <p
        aria-live="assertive"
        className="absolute -top-8 mt-2 w-full text-xs px-2 font-medium text-[--error]"
      >
        {errors.email?.message}
      </p>
      <p className="mt-2 inline-flex flex-wrap items-center justify-center gap-x-1 text-center text-xs text-[--font-variant] sm:text-left md:justify-start">
        <span>No spam, unsubscribe at any time. To learn more</span>
        <a
          href="/policies/privacy"
          className="whitespace-nowrap hover:text-[--action-color] underline"
        >
          read our Privacy Policy.
        </a>
      </p>
    </form>
  );
}
