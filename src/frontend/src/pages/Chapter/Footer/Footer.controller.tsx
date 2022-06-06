import { IAdditionalInfo } from "helpers/coursesInfo";
import * as React from "react";

import { FooterView } from "./Footer.view";

export interface IFooter {
  nextChapter: string
  previousChapter: string
  percent: number
  additionalInfo: IAdditionalInfo
}

export const Footer = ({ nextChapter, previousChapter, percent, additionalInfo }: IFooter) => {
  return <FooterView percent={percent} nextChapter={nextChapter} previousChapter={previousChapter} additionalInfo={additionalInfo} />;
};
