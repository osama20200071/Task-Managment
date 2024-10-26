import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("must be a valid email"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

// export const createTaskSchema = yup.object({
//   title: yup.string().required("Title is required"),
//   description: yup.string().required("Description is required"),
//   priority: yup.string().required("Priority is required"),
//   imageKey: yup
//     .mixed()
//     .test("required", "Image is required", (value) => {
//       return value && value.length > 0;
//     })
//     .test("fileType", "Unsupported File Format", (value) => {
//       if (!value || value.length === 0) {
//         return true; // If no file is selected, skip this test (required will handle it)
//       }
//       return [
//         "image/svg",
//         "image/png",
//         "image/gif",
//         "image/jpg",
//         "image/jpeg",
//       ].includes(value[0].type);
//     })
//     .test("fileSize", "File is too large ", (value) => {
//       if (!value || value.length === 0) {
//         return true; // Skip this test if no file is selected
//       }
//       return value[0].size <= 4000000; // File size less than or equal to 4MB
//     }),
// });

export const createTaskSchema = ({ hasExistingImage = false }) =>
  yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    priority: yup
      .string()
      .oneOf(["low", "medium", "high"], "Select a valid priority")
      .required("Priority is required"),
    imageKey: yup
      .mixed()
      .test("fileRequired", "Image is required", function (value) {
        if (!hasExistingImage) {
          return value && value.length > 0;
        }
        return true;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (!hasExistingImage) {
          if (value && value[0]) {
            return [
              "image/svg",
              "image/png",
              "image/gif",
              "image/jpg",
              "image/jpeg",
            ].includes(value[0].type);
          }
        }
        return true;
      })
      .test("fileSize", "File is too large ", (value) => {
        if (!hasExistingImage) {
          if (!value || value.length === 0) {
            return true; // Skip this test if no file is selected
          }
          return value[0].size <= 4000000; // File size less than or equal to 4MB
        }
        return true;
      }),
  });
