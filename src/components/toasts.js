import { toast } from "react-toastify";

const attributes = {
  className: "toast--error",
  position: toast.POSITION.BOTTOM_RIGHT,
  hideProgressBar: true,
  autoClose: 2000,
};

export const errorToast = (text) =>
  toast.error(
    <>
      <i className="fa fa-exclamation-circle mr-sm" aria-hidden="true" />
      {text}
    </>,
    attributes
  );

export const successToast = (text) =>
  toast.success(
    <>
      <i className="fa fa-check-circle mr-sm" aria-hidden="true" />
      {text}
    </>,
    { ...attributes, className: " toast--success" }
  );
