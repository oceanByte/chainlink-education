import * as React from "react";

import { FooterView } from "./Footer.view";

export const Footer = ({ nextChapter, previousChapter, percent }: any) => {
  return <FooterView percent={percent} nextChapter={nextChapter} previousChapter={previousChapter} />;
};
