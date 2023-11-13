import { PiXBold } from "react-icons/pi";
import { Title, ActionIcon, Input, Button } from "rizzui";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import useFetch from "@/hooks/useFetch";
import { REQUEST_TYPE } from "@/utils/types";

export const AddUSer = () => {
  const { closeModal } = useModal();
  const { isLoading, sendRequest } = useFetch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      passWord: "",
      // createdAt: data.createdAt,
      // modified: data.modified,
      //status: "",
    },
    // validationSchema: Yup.object().shape({
    //   username: Yup.string().matches(RULES.noBlank).required("Required"),
    //   password: Yup.string().matches(RULES.noBlank).required("Required"),
    // }),

    onSubmit: async (value) => {
      const report = {
        userName: value.userName,
        email: value.email,
        passWord: value.passWord,
        // createdAt: value.createdAt,
        // modified: value.modified,
        //status: value.status,
      };

      await sendRequest({
        type: REQUEST_TYPE.ADD_USER,
        formData: report,
      });

      sendRequest({ type: REQUEST_TYPE.USER });

      closeModal();

      // loginUser(report, dispatch, navigate);
      // handleRequest("login", report);
    },
  });

  return (
    <div>
      <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
        <div className="mb-6 flex items-center justify-between">
          <Title as="h3" className="text-xl">
            Add User
          </Title>
          <ActionIcon
            size="sm"
            variant="text"
            onClick={() => closeModal()}
            className="p-0 text-gray-500 hover:!text-gray-900"
          >
            <PiXBold className="h-[18px] w-[18px]" />
          </ActionIcon>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <label>Username</label>
          <Input
            id="userName"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          <label>Email</label>
          <Input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label>Password</label>
          <Input
            id="passWord"
            name="passWord"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passWord}
          />

          <div className=" py-2 border-t">
            {isLoading ? (
              <Button className="px-5 py-1.5 float-right" disabled>
                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                variant="outline"
                className="px-5 py-1.5 float-right"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Save
              </Button>
            )}
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-1.5  float-right text-base font-medium rounded text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
