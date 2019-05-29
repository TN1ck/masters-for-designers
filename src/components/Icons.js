import React from "react";
import styled from "styled-components";
import house from "../img/house.svg";
import facebook from "../img/facebook.svg";
import twitter from "../img/twitter.svg";
import instagram from "../img/instagram.svg";

const IconLink = styled.a`
  display: inline-block;
  &,
  &:hover,
  &:focus {
    border: none;
  }

  img {
    height: 26px;
    width: 26px;
  }
`;

const Icon = styled.div`
  display: inline-block;

  height: 26px;
  width: 26px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const createLinkIcon = (src, alt) => {
  return props => {
    return props.href && props.href.includes("http") ? (
      <IconLink target="_blank" rel="nofollow" {...props}>
        <img src={src} alt={alt} />
      </IconLink>
    ) : null;
  };
};

export const InstagramIcon = createLinkIcon(instagram, "instagram icon");

export const TwitterIcon = createLinkIcon(twitter, "twitter icon");

export const FacebookIcon = createLinkIcon(facebook, "facebook icon");

export const HouseIcon = createLinkIcon(house, "house icon");

export const SaveIcon = props => (
  <Icon {...props}>
    <svg width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <g fill="none" fillRule="evenodd">
        <circle className="save-fill" fill={props.fill || "#000"} cx="14.5" cy="14.5" r="14.5" />
        <path
          stroke="#FFF"
          strokeWidth="1.6"
          strokeLinecap="square"
          d="M9.321 7.25H19.68v14.5L14.5 18.436 9.321 21.75z"
        />
      </g>
    </svg>
  </Icon>
);
