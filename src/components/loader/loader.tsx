import { Triangle } from "react-loader-spinner";

export interface LoaderProps {
  height: string;
  width: string;
}

export default function LoadingState({height, width}: LoaderProps) {
  return (
    <Triangle
      visible={true}
      height={height}
      width={width}
      color="#CF8292"
      ariaLabel="triangle-loading"
      //   wrapperStyle={{}}
      wrapperClass={""}
    />
  );
}
