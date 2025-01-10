

export const RequiredLabel = ({ text }: { text: string }) => {
  return (
    <label>
      {text} <span style={{ color: 'red' }}>*</span>
    </label>
  );
};
