import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { FaSquareCheck, FaRectangleXmark } from "react-icons/fa6";

const PricingTable = () => {
  return (
    <table cellPadding="10px" cellSpacing="10px">
      <thead>
        <tr cellPadding="10px" cellSpacing="10px">
          <th className="feature-title">Feature</th>
          <th className="feature-title">Member</th>
          <th className="feature-title">Starter</th>
          <th className="feature-title">Pro</th>
          <th className="feature-title">Enterprise</th>
        </tr>
      </thead>

      <tbody>
        <tr cellPadding="10px" cellSpacing="10px">
          <td className="feature-name">Theme Color</td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
        </tr>
        <tr cellPadding="10px" cellSpacing="10px">
          <td className="feature-name">FAQs</td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
        </tr>
        <tr cellPadding="10px" cellSpacing="10px">
          <td className="feature-name">Branding</td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
        </tr>
        <tr cellPadding="10px" cellSpacing="10px">
          <td className="feature-name">Lead Capture</td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
        </tr>
        <tr cellPadding="10px" cellSpacing="10px">
          <td className="feature-name">AI Agent</td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaRectangleXmark className="x-icon" />
          </td>
          <td className="icon-container">
            <FaSquareCheck className="check-icon" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PricingTable;
