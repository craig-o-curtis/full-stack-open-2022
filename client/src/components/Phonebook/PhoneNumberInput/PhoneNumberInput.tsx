import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import * as Styled from "./PhoneNumberInput.styled";

interface PhoneNumberInputProps {
  value: string;
  disabled: boolean;
  onChange: ({
    number,
    isPossibleNumber,
  }: {
    number: string;
    isPossibleNumber: boolean;
  }) => void;
}

const PhoneNumberInput = ({
  onChange,
  disabled,
  value,
}: PhoneNumberInputProps) => {
  const handleChange = (newVal: string) => {
    onChange({
      number: formatPhoneNumberIntl(newVal),
      isPossibleNumber: newVal !== undefined && isPossiblePhoneNumber(newVal),
    });
  };

  return (
    <Styled.PhoneInputWrapper>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      {isPossiblePhoneNumber(value) && <Styled.SuccessIconGuy />}
    </Styled.PhoneInputWrapper>
  );
};

export default PhoneNumberInput;
