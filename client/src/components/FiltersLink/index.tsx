import Link from "next/link";
import Button from "../MainButton";
import Cookies from "js-cookie";
import { asset } from "@/utils/asset";

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
        href={{
          pathname: "/yourhall/sort",
          query: { user: username, filter: props.filter },
        }}
      >
        <Button
          variant={isActive ? "outline" : "secondary"}
          size="md"
          icon={asset(`/svgs/${props.filter}.svg`)}
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
