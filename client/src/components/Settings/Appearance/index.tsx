import Button from "@/components/MainButton";
import { toggleFontSize } from "@/features/fontSize";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const Appearance = () => {
  const dispatch = useDispatch();
  const fontSize = useSelector((state: RootState) => state.fontSize.value);

  const fontSizeOptions = [
    { value: "small", state: "16" },
    { value: "normal", state: "24" },
    { value: "large", state: "32" },
  ];
  return (
    <>
      <li className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-10">
        <section className="flex flex-col w-full md:w-2/3 gap-2">
          <p className="text-xl md:text-2xl font-bold">Font Size Typing</p>
          <p className="text-justify text-sm md:text-base">
            When you're in the middle of a typing test or has completed a
            session, you can press the Tab key followed by the Enter key to
            immediately restart the test. This eliminates the need to move your
            hands away from the keyboard to use a mouse or trackpad, keeping
            your focus entirely on typing.
          </p>
        </section>
        <ul className="grid grid-cols-3 gap-2 w-full md:w-1/3">
          {fontSizeOptions.map((option) => {
            return (
              <div key={option.value} className="w-full">
                <Button
                  style={{ fontSize: option.state }}
                  className="!rounded-xl w-full h-full !text-xs sm:!text-sm md:!text-base"
                  onClick={() => {
                    localStorage.setItem("fontSize", option.state);
                    dispatch(toggleFontSize(option.state));
                  }}
                  variant={fontSize === option.state ? "secondary" : "outline"}
                  size="md"
                >
                  {option.value} ({option.state})
                </Button>
              </div>
            );
          })}
        </ul>
      </li>
    </>
  );
};

export default Appearance;