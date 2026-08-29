import Link from "next/link";
import Button from "../MainButton";
import Cookies from "js-cookie";

interface FilterLinksProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  filter: string;
  isActive?: boolean;
}

const FilterLinks = (props: FilterLinksProps) => {
  const username = Cookies.get("username");
  const { isActive = false, ...rest } = props;

  return (
    username && (
      <Link
        {...rest}
        href={{ pathname: `sort`, query: { filter: props.filter } }}
      >
        <Button
          variant={isActive ? "outline" : "secondary"}
          size="md"
          icon={`/svgs/${props.filter}.svg`}
          iconPosition="left"
          className={props.className}
        >
          {props.filter}
        </Button>
      </Link>
    )
  );
};

export default FilterLinks;
