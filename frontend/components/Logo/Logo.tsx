import Link from "next/link";
import React from "react";

interface ILogoProps {
  className?: any;
  height?: number;
  width?: number;
}

export class Logo extends React.Component<ILogoProps, {}> {
  public static defaultProps: Partial<ILogoProps> = {
    height: 40,
    width: 40
  };

  public render() {
    const { height, width, className } = this.props;

    return (
      <Link href="/">
        <a>
          <img
            src="https://static.cuistotducoin.com/img/logo.svg"
            alt="Logo de Cuistot du coin"
            height={height}
            width={width}
            className={className}
            />
        </a>
      </Link>
    );
  }
}

export default Logo as any;