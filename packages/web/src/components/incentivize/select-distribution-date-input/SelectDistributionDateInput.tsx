import React, { useCallback, useRef, useState } from "react";
import Calendar from "@components/common/calendar/Calendar";
import { SelectDistributionDateInputWrapper } from "./SelectDistributionDateInput.styles";
import IconCalender from "@components/common/icons/IconCalender";
import useModalCloseEvent from "@hooks/common/use-modal-close-event";

interface DistributionPeriodDate {
  year: number;
  month: number;
  date: number;
}

export interface SelectDistributionDateInputProps {
  title: string;
  date?: DistributionPeriodDate;
  setDate: (date: DistributionPeriodDate) => void;
}

const DefaultDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
};

const SelectDistributionDateInput: React.FC<SelectDistributionDateInputProps> = ({
  title,
  date,
  setDate,
}) => {
  const [opened, setOpened] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = useCallback(() => setOpened(!opened), [opened]);
  const closeModal = useCallback(() => setOpened(false), []);

  useModalCloseEvent(modalRef, closeModal);

  const getDateText = useCallback(() => {
    if (!date) {
      return "";
    }
    return `${date.date}/${date.month}/${date.year}`;
  }, [date]);

  const onClickCalendarDate = (date: DistributionPeriodDate) => {
    setDate(date);
    setOpened(false);
  };

  return (
    <SelectDistributionDateInputWrapper>
      <span className="description">{title}</span>

      <div className="date-wrapper" onClick={toggleModal}>
        <IconCalender className="icon-calender" />
        <span className="date">{getDateText()}</span>
      </div>

      <div className="calendar-container">
        <div ref={modalRef} className={`calendar-wrapper ${opened && "open"}`}>
          <Calendar
            selectedDate={date || DefaultDate}
            onClickDate={onClickCalendarDate}
          />
        </div>
      </div>
    </SelectDistributionDateInputWrapper>
  );
};

export default SelectDistributionDateInput;