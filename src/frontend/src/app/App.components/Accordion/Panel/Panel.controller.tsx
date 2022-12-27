import { ICoursesGroups } from 'helpers/coursesInfo';
import React from 'react';

import { PublicUser } from '../../../../shared/user/PublicUser'
import { PanelView } from './Panel.view';
import { PanelProfileView } from './PanelProfile.view';

interface IPanelWrapper {
  data: {
    group: ICoursesGroups,
    handlerActiveTab: (index: number) => void
    activeTab: number
    user?: PublicUser
    index: number
    type: string
  }
}

const PanelWrapper = ({ data }: IPanelWrapper) => {
  const panelInnerRef = React.useRef<any>(null);
  const [coursesLimit, setCoursesLimit] = React.useState(6);
  const { group, activeTab, index, type, user } = data;
  const { courses, subject, overallProgress } = group;

  const [state, setState] = React.useState({
    height: 0,
  });

  const [groupState, setGroupState] = React.useState({
    isOpen: true,
  });

  const handlerOpenGroupTab = () => {
    setGroupState((prev) => ({
      isOpen: !prev.isOpen,
    }));
  };

  const getHeightData = (typePanel: string) => {
    // let isActive = typePanel === 'profile'? groupState.isOpen : activeTab === index;
    let isActive = groupState.isOpen;

    const innerStyle = {
      height: `${isActive ? state.height : 0}px`,
    };

    return {
      isActive,
      innerStyle
    }
  }

  const { isActive, innerStyle } = getHeightData(type);

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

  switch (type) {
    case 'profile':
      return (
        <PanelProfileView data={{
          subject,
          courses,
          overallProgress,
          user,
          isActive,
          handlerOpenGroupTab,
          panelInnerRef,
          innerStyle,
        }} />
      );
  
    default:
      return (
        <PanelView data={{
          subject,
          courses,
          activeTab,
          user,
          index,
          handlerActiveTab: handlerOpenGroupTab,
          isActive,
          panelInnerRef,
          innerStyle,
          coursesLimit,
          handleClickMore,
        }} />
      );
  }
};


export default PanelWrapper;
