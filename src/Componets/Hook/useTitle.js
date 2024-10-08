import { useEffect } from "react";

export default function useTitle(pageTitle) {
  useEffect(function () {
    document.title = pageTitle;
  },[]);
}