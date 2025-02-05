import { fonts } from "@constants/font.constant";
import styled from "@emotion/styled";
import { ContainerWidth, media } from "@styles/media";
import mixins from "@styles/mixins";
import { Z_INDEX } from "@styles/zIndex";

export const HeaderWrapper = styled.header`
  ${mixins.flexbox("column", "center", "center")};
  top: 0;
  position: fixed;
  z-index: ${Z_INDEX.fixed};
  width: 100%;
  min-width: 360px;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.background01};
  border-bottom: 1px solid ${({ theme }) => theme.color.border02};
`;

export const BottomNavWrapper = styled.nav`
  ${mixins.flexbox("column", "center", "center")};
  ${fonts.p1};
  width: 100%;
  min-width: 360px;
  bottom: 0px;
  position: fixed;
  z-index: ${Z_INDEX.fixed};
  border-radius: 8px 8px 0px 0px;
  backdrop-filter: blur(6px);
  border: 1px solid ${({ theme }) => theme.color.border02};
  background-color: ${({ theme }) => theme.color.backgroundOpacity2};
`;

export const BottomNavContainer = styled.div`
  ${mixins.flexbox("row", "center", "space-between")};
  max-width: ${ContainerWidth.MOBILE_CONTAINER};
  width: 100%;
  padding: 0px 24px;
`;

export const BottomNavItem = styled.div`
  ${mixins.flexbox("row", "center", "center")};
  padding: 16px 8px;
  transition: color 0.3s ease;
  color: ${({ theme }) => theme.color.text04};
  &.selected,
  &:hover {
    color: ${({ theme }) => theme.color.text16};
  }
`;

export const HeaderContainer = styled.div`
  ${mixins.flexbox("row", "center", "space-between")};
  max-width: ${ContainerWidth.WEB_CONTAINER};
  //   min-width: 360px;
  width: 100%;
  padding: 17px 40px;
  ${media.tablet} {
    max-width: ${ContainerWidth.TABLET_CONTAINER};
    padding: 12px 40px;
  }
  ${media.mobile} {
    padding: 8px 16px;
    width: 100%;
  }
`;

export const LeftSection = styled.div`
  ${mixins.flexbox("row", "center", "flex-start")};
  max-width: 895px;
  width: 100%;
  gap: 50px;
  ${media.tablet} {
    max-width: 422px;
    gap: 32px;
  }
  ${media.mobile} {
    max-width: 21px;
  }
`;

export const LogoLink = styled.a`
  width: 31.5px;
  height: 36px;
  ${media.tablet} {
    width: 28px;
    height: 32px;
  }
  ${media.mobile} {
    width: 21px;
    height: 24px;
  }
  .header-main-logo {
    width: 31.501px;
    height: 36px;
    ${media.tablet} {
      width: 28.001px;
      height: 32px;
    }
    ${media.mobile} {
      width: 21px;
      height: 24px;
    }
  }
`;

export const Navigation = styled.nav`
  ${mixins.flexbox("row", "center", "flex-start")};
  gap: 30px;
  ${media.tablet} {
    gap: 12px;
  }
  ul {
    ${mixins.flexbox("row", "center", "center")};
    gap: 40px;
    ${media.tablet} {
      gap: 16px;
    }
  }
  li {
    padding: 8px 0px;
    transition: color 0.3s ease;
    ${mixins.flexbox("row", "center", "center")};
    ${fonts.body9};
    color: ${({ theme }) => theme.color.text04};
    &.selected,
    &:hover {
      color: ${({ theme }) => theme.color.text16};
    }
    ${media.tablet} {
      padding: 8px 12px;
      ${fonts.body11};
    }
  }
`;

export const RightSection = styled.div`
  ${mixins.flexbox("row", "center", "flex-end")};
  max-width: 255px;
  width: 100%;
  gap: 10px;
  ${media.tablet} {
    max-width: 231px;
    gap: 8px;
  }
`;

export const SearchContainer = styled.div`
  ${mixins.flexbox("row", "center", "flex-start")};
  gap: 10px;
  ${media.tablet} {
    gap: 10px;
  }
`;

export const SearchButton = styled.button`
  ${mixins.flexbox("row", "center", "flex-start")};
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-right: 2px;
  .search-icon {
    width: 32.5px;
    height: 32.5px;
    * {
      fill: ${({ theme }) => theme.color.icon03};
    }
    ${media.tablet} {
      width: 29px;
      height: 29px;
    }
  }
  &:hover {
    .search-icon * {
      fill: ${({ theme }) => theme.color.icon07};
    }
  }
`;

export const DepositButton = styled.button`
  ${mixins.flexbox("row", "center", "center")};
  color: #E0E8F4;
  gap: 8px;
  ${fonts.p1}
  padding: 10px 16px 10px 14px;
  background-color: ${({ theme }) => theme.color.background04};
  border-radius: 8px;
  width: 101px;
  svg {
    width: 15px;
    height: 15px;
    * {
    fill: #E0E8F4;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.background04Hover};
  }
`;
