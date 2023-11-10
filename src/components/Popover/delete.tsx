import React from "react";
import { PiTrashFill } from "react-icons/pi";
import { Popover, Title, Button, ActionIcon } from "rizzui";

type DeletePopoverProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

export default function DeletePopover({
  title,
  description,
  onDelete,
}: DeletePopoverProps) {
  return (
    <Popover
      placement="left"
      className="z-50 bg-white"
      content={({ setOpen }) => (
        <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
          <Title
            as="h6"
            className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
          >
            <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
          </Title>
          <div className="mb-2 leading-relaxed text-gray-500">
            {description}
          </div>
          <div className="flex items-center  justify-end gap-3">
            <Button
              size="sm"
              variant="outline"
              className=" h-7 "
              onClick={() => {
                onDelete(), setOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}
    >
      <ActionIcon
        size="sm"
        variant="outline"
        aria-label={"Delete Item"}
        className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
      >
        <TrashIcon className="h-4 w-4" />
      </ActionIcon>
    </Popover>
  );
}

export function TrashIcon({
  strokeWidth,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth ?? 1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}
