import { TextLinkHrefEnum } from "@/utils/enums/text-link-href";
import { Link, Typography } from "@mui/material";

interface TextLinkComponentProps {
  href: TextLinkHrefEnum;
  text: string;
}

export default function TextLinkComponent(props: TextLinkComponentProps) {
  const { href, text } = props;

  return (
    <Typography
      variant="body2"
      align="center"
      style={{
        marginTop: '16px',
        fontWeight: 'semi-bold',
      }}
    >
      <Link
        style={{
          color: '#3f51b5',
        }}
        underline="hover"
        href={href}
      >
        {text}
      </Link>
    </Typography>
  );
}
