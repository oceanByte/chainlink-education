import { CourseNameType } from "pages/Course/Course.data"

export const getPathForCertificate = (title: string) => {
  switch (title) {
    case CourseNameType.CHAINLINK_101:
      return '/chainlink101_certificate.jpg'
    case CourseNameType.SOLIDITY_INTRO:
      return '/solidityIntroduction_certificate.jpg'
      case CourseNameType.SOLIDITY_102:
        return '/solidity102_certificate.jpg'
    case CourseNameType.VRF_V2:
      return '/vrfV2Introduction_certificate.jpg'
    case CourseNameType.ADVANCED_VRF_V2:
      return '/advancedCourseVRFv2_certificate.jpg'
    case CourseNameType.CHAINLINK_KEEPERS:
      return '/chainlinkKeepers_certificate.jpg'
  
    default:
      return ''
  }
}

export const getClassForCourse = (title: string) => {
  switch (title) {
    case CourseNameType.CHAINLINK_101:
      return 'chainlink-101'
    case CourseNameType.SOLIDITY_INTRO:
      return 'soliditi-intro'
    case CourseNameType.SOLIDITY_102:
      return 'solidity-102'
    case CourseNameType.VRF_V2:
      return 'vrf-v2'
    case CourseNameType.ADVANCED_VRF_V2:
      return 'advanced-vrf-v2'
    case CourseNameType.CHAINLINK_KEEPERS:
      return 'chainlink-keepers'
  
    default:
      return ''
  }
}