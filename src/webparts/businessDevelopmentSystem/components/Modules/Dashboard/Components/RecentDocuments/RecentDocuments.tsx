/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import { getFileIcon } from "../../../../../../../Utils/dataTable";
import dayjs from "dayjs";
import "./RecentDocuments.css";

interface IRecentDocumentsProps {
  documentsData: any[];
}

const RecentDocuments: React.FC<IRecentDocumentsProps> = ({
  documentsData,
}) => {
  return (
    <div className="recent_documents_dashboard">
      <div className="event-header">
        <span>Recent Documents</span>
      </div>
      <div className="recent_documents_wrapper">
        {documentsData?.length === 0 && (
          <div className="no_data_found_message">No records found.</div>
        )}
        {documentsData?.map((document: any, index: number) => {
          return (
            <div className="document-card" key={index}>
              <div className="document-icon">{getFileIcon(document?.Name)}</div>
              <div className="document-details">
                <div className="document-name" title={document?.Name}>
                  {document?.Name}
                </div>
                <div
                  className="document-path-details"
                  title={`${document?.country} / ${document?.project} /${" "}${
                    document?.documentType
                  }`}
                >
                  {document?.country} / {document?.project} /{" "}
                  {document?.documentType}
                </div>
                <div className="document-author-created">
                  <div className="document-created">
                    Modified at{" "}
                    {dayjs(document?.TimeLastModified).format("DD/MM/YYYY")}
                  </div>
                  <div className="document-author">
                    <span>{document?.CreatedBy?.[0]?.DisplayName}</span>
                    <img
                      src={document?.CreatedBy?.[0]?.ImgUrl}
                      alt={document?.CreatedBy?.[0]?.DisplayName}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentDocuments;
