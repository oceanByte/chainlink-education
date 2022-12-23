import { ICoursesGroups } from 'helpers/coursesInfo';
import React from 'react';

import { PublicUser } from '../../../../shared/user/PublicUser'
import { PanelView } from './Panel.view';

interface IPanelWrapper {
  data: {
    group: ICoursesGroups,
    handlerActiveTab: (index: number) => void
    activeTab: number
    user?: PublicUser
    index: number
  }
}

const PanelWrapper = ({ data }: IPanelWrapper) => {
  const panelInnerRef = React.useRef<any>(null);
  const [coursesLimit, setCoursesLimit] = React.useState(6);
  const { group, activeTab, index, handlerActiveTab } = data;
  const { courses, subject } = group;

  const [state, setState] = React.useState({
    height: 0,
  });

  const isActive = activeTab === index;
  const innerStyle = {
    height: `${isActive ? state.height : 0}px`,
  };

  const updateHeight = () => {
    if (panelInnerRef.current) {
      const height = panelInnerRef.current?.scrollHeight;

      setState(() => ({
        height,
      }));
    }
  };

  const handleClickMore = () => {
    setCoursesLimit((prev) => prev + 6);
  };

  React.useEffect(() => {
    window.setTimeout(() => {
      updateHeight();
    }, 50);
  }, [coursesLimit]);

  React.useEffect(() => {
    const handleResize = () => {
      updateHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PanelView data={{
      subject,
      courses,
      activeTab,
      index,
      handlerActiveTab,
      isActive,
      panelInnerRef,
      innerStyle,
      coursesLimit,
      handleClickMore,
    }} />
  );
};


export default PanelWrapper;
