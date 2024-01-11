interface DropdownButtonProps {
  text: string;
  action: () => void;
  title: string;
  showItems: boolean;
  numberOfItems: number;
}
export const DropdownButton = ({
  text,
  action,
  title,
  showItems,
  numberOfItems,
}: DropdownButtonProps) => {
  return (
    <button onClick={numberOfItems > 0 ? action : undefined} title={title}>
      <p>{text}</p>
      {numberOfItems > 0 && (
        <i
          style={{ rotate: showItems ? "0deg" : "90deg" }}
          className="fas fa-angle-right"
        ></i>
      )}
    </button>
  );
};
