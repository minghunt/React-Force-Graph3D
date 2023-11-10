import { PiXBold } from "react-icons/pi";
import { Title, ActionIcon, Input, Button } from "rizzui";
import { useModal } from "../../hooks/useModal";
import { UserDetail } from "../../utils/types/user";
import { formatDate } from "../../utils/helpers/format-date";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RULES } from "../../utils/helpers/rules";
import useFetch from "../../hooks/useFetch";
import { REQUEST_TYPE } from "../../utils/types";

type EidtUserProps = {
  data: UserDetail;
};

export const EditUser: React.FC<EidtUserProps> = ({ data }) => {
  const { closeModal } = useModal();
  const dateFormat = "MMMM D, YYYY";
  const { isLoading, sendRequest } = useFetch();

  const formik = useFormik({
    initialValues: {
      id: data.id,
      userName: data.userName,
      email: data.email,
      // createdAt: data.createdAt,
      // modified: data.modified,
      status: data.status,
    },
    // validationSchema: Yup.object().shape({
    //   username: Yup.string().matches(RULES.noBlank).required("Required"),
    //   password: Yup.string().matches(RULES.noBlank).required("Required"),
    // }),

    onSubmit: async (value) => {
      const report = {
        id: data.id,
        userName: value.userName,
        email: value.email,
        // createdAt: value.createdAt,
        // modified: value.modified,
        status: value.status,
      };

      await sendRequest({
        type: REQUEST_TYPE.UPDATE_USER,
        data: report,
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
            Edit User
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

          <label>Status</label>
          <Input
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
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
