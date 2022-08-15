import styled from 'styled-components/macro'

import badgeLargeNoCompleted from '../../../assets/badgeLarge_noCompleted.svg'
import badgeMediumNoCompleted from '../../../assets/badgeMedium_noCompleted.svg'
import badgeSmallNoCompleted from '../../../assets/badgeSmall_noCompleted.svg'

import badgeLarge_Chainlink from '../../../assets/badgeLarge_Chainlink.svg'
import badgeMedium_Chainlink from '../../../assets/badgeMedium_Chainlink.svg'
import badgeSmall_Chainlink from '../../../assets/badgeSmall_Chainlink.svg'

import badgeLarge_SolidityIntroduction from '../../../assets/badgeLarge_SolidityIntroduction.svg'
import badgeMedium_SolidityIntroduction from '../../../assets/badgeMedium_SolidityIntroduction.svg'
import badgeSmall_SolidityIntroduction from '../../../assets/badgeSmall_SolidityIntroduction.svg'

import badgeLarge_VRFv2Introduction from '../../../assets/badgeLarge_VRFv2Introduction.svg'
import badgeMedium_VRFv2Introduction from '../../../assets/badgeMedium_VRFv2Introduction.svg'
import badgeSmall_VRFv2Introduction from '../../../assets/badgeSmall_VRFv2Introduction.svg'

import badgeLarge_AdvancedVRFv2Introduction from '../../../assets/badgeLarge_AdvancedVRFv2Introduction.svg'
import badgeMedium_AdvancedVRFv2Introduction from '../../../assets/badgeMedium_AdvancedVRFv2Introduction.svg'
import badgeSmall_AdvancedVRFv2Introduction from '../../../assets/badgeSmall_AdvancedVRFv2Introduction.svg'

import badgeLarge_ChainlinkKeepers from '../../../assets/badgeLarge_ChainlinkKeepers.svg'
import badgeMedium_ChainlinkKeepers from '../../../assets/badgeMedium_ChainlinkKeepers.svg'
import badgeSmall_ChainlinkKeepers from '../../../assets/badgeSmall_ChainlinkKeepers.svg'

export const BadgeStyled = styled.div<{ percentage?: number }>`
  .large-badge,
  .medium-badge,
  .small-badge {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;
  }

  .badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-size: contain;
  }

  .only-large-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 115px;
    height: 125px;
    position: relative;

    .badge {
      width: 104px;
      height: 114px;
      background: url(${badgeLargeNoCompleted}) no-repeat center;
    }

    &.isCompleted {
      .badge {
        &.chainlink-101 {
          background: url(${badgeLarge_Chainlink}) no-repeat center;
        }
        &.soliditi-intro {
          background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
        }
        &.solidity-102 {
          background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
        }
        &.vrf-v2 {
          background: url(${badgeLarge_VRFv2Introduction}) no-repeat center;
        }
        &.advanced-vrf-v2 {
          background: url(${badgeLarge_AdvancedVRFv2Introduction}) no-repeat center;
        }
        &.chainlink-keepers {
          background: url(${badgeLarge_ChainlinkKeepers}) no-repeat center;
        }
      }
    }
  }

  .only-medium-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 109px;
    position: relative;

    .badge {
      width: 79px;
      height: 88px;
      background: url(${badgeMediumNoCompleted}) no-repeat center;
    }

    &.isCompleted {
      .badge {
        &.chainlink-101 {
          background: url(${badgeMedium_Chainlink}) no-repeat center;
        }
        &.soliditi-intro {
          background: url(${badgeMedium_SolidityIntroduction}) no-repeat center;
        }
        &.solidity-102 {
          background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
        }
        &.vrf-v2 {
          background: url(${badgeMedium_VRFv2Introduction}) no-repeat center;
        }
        &.advanced-vrf-v2 {
          background: url(${badgeMedium_AdvancedVRFv2Introduction}) no-repeat center;
        }
        &.chainlink-keepers {
          background: url(${badgeMedium_ChainlinkKeepers}) no-repeat center;
        }
      }
    }
  }

  .only-small-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 60px;
    position: relative;

    .badge {
      width: 43px;
      height: 48px;
      background: url(${badgeSmallNoCompleted}) no-repeat center;
    }

    &.isCompleted {
      .badge {
        &.chainlink-101 {
          background: url(${badgeSmall_Chainlink}) no-repeat center;
        }
        &.soliditi-intro {
          background: url(${badgeSmall_SolidityIntroduction}) no-repeat center;
        }
        &.solidity-102 {
          background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
        }
        &.vrf-v2 {
          background: url(${badgeSmall_VRFv2Introduction}) no-repeat center;
        }
        &.advanced-vrf-v2 {
          background: url(${badgeSmall_AdvancedVRFv2Introduction}) no-repeat center;
        }
        &.chainlink-keepers {
          background: url(${badgeSmall_ChainlinkKeepers}) no-repeat center;
        }
      }
    }
  }

  @media screen and (min-width: 1300px) {
    .large-badge {
      display: flex;
      width: 115px;
      height: 125px;

      .badge {
        width: 104px;
        height: 114px;
        background: url(${badgeLargeNoCompleted}) no-repeat center;
      }

      &.isCompleted {
        .badge {
          &.chainlink-101 {
            background: url(${badgeLarge_Chainlink}) no-repeat center;
          }
          &.soliditi-intro {
            background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
          }
          &.solidity-102 {
            background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
          }
          &.vrf-v2 {
            background: url(${badgeLarge_VRFv2Introduction}) no-repeat center;
          }
          &.advanced-vrf-v2 {
            background: url(${badgeLarge_AdvancedVRFv2Introduction}) no-repeat center;
          }
          &.chainlink-keepers {
            background: url(${badgeLarge_ChainlinkKeepers}) no-repeat center;
          }
        }
      }
    }
  }

  @media screen and (min-width: 700px) and (max-width: 1299px) {
    .medium-badge {
      display: flex;
      width: 91px;
      height: 100px;

      .badge {
        width: 78px;
        height: 88px;
        background: url(${badgeMediumNoCompleted}) no-repeat center;
      }

      &.isCompleted {
        .badge {
          width: 79px;
          height: 88px;

          &.chainlink-101 {
            background: url(${badgeMedium_Chainlink}) no-repeat center;
          }
          &.soliditi-intro {
            background: url(${badgeMedium_SolidityIntroduction}) no-repeat center;
          }
          &.solidity-102 {
            background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
          }
          &.vrf-v2 {
            background: url(${badgeMedium_VRFv2Introduction}) no-repeat center;
          }
          &.advanced-vrf-v2 {
            background: url(${badgeMedium_AdvancedVRFv2Introduction}) no-repeat center;
          }
          &.chainlink-keepers {
            background: url(${badgeMedium_ChainlinkKeepers}) no-repeat center;
          }
        }
      }
    }
  }

  @media screen and (max-width: 699px) {
    .small-badge {
      display: flex;
      width: 55px;
      height: 60px;

      .badge {
        width: 43px;
        height: 48px;
        background: url(${badgeSmallNoCompleted}) no-repeat center;
      }

      &.isCompleted {
        .badge {
          &.chainlink-101 {
            background: url(${badgeSmall_Chainlink}) no-repeat center;
          }
          &.soliditi-intro {
            background: url(${badgeSmall_SolidityIntroduction}) no-repeat center;
          }
          &.solidity-102 {
            background: url(${badgeLarge_SolidityIntroduction}) no-repeat center;
          }
          &.vrf-v2 {
            background: url(${badgeSmall_VRFv2Introduction}) no-repeat center;
          }
          &.advanced-vrf-v2 {
            background: url(${badgeSmall_AdvancedVRFv2Introduction}) no-repeat center;
          }
          &.chainlink-keepers {
            background: url(${badgeSmall_ChainlinkKeepers}) no-repeat center;
          }
        }
      }
    }
  }
`
