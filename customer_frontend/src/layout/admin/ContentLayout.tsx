import { Breadcrumb } from "antd";
import { useMemo } from "react";
import { FolderOutlined } from "@ant-design/icons";
import ContentHeader from "../../components/admin/ContentHeader";

export interface ContentProps {
    subMenuName: string; // previous name
    subMenuIcon: JSX.Element;
    currentName: string; // current name
    currentIcon: JSX.Element;
    element: JSX.Element; // JSX Element
    description: string;
}

//TODO: Content.tsx
const ContentLayout = (items: ContentProps) => {
    const BreadCrumbItems = useMemo(() => {
        return items.subMenuName === ""
            ? [
                  {
                      title: (
                          <>
                              <FolderOutlined />
                              <span>目錄</span>
                          </>
                      ),
                  },
                  {
                      title: (
                          <>
                              {items.currentIcon}
                              <span>{items.currentName}</span>
                          </>
                      ),
                  },
              ]
            : [
                  {
                      title: (
                          <>
                              <FolderOutlined />
                              <span>目錄</span>
                          </>
                      ),
                  },
                  {
                      title: (
                          <>
                              {items.subMenuIcon}
                              <span>{items.subMenuName}</span>
                          </>
                      ),
                  },
                  { title: items.currentName },
              ];
    }, [items]);

    return (
        <div className="m-3 h-5/6">
            <Breadcrumb items={BreadCrumbItems} />
            <ContentHeader
                icon={
                    items.subMenuName === ""
                        ? items.currentIcon
                        : items.subMenuIcon
                }
                name={items.currentName}
                description={items.description}
            />
            <div className="bg-white min-h-full max-h-fit p-5">
                {items.element}
            </div>
        </div>
    );
};

/*
<>
    <Breadcrumb style={{margin:'16px 0'}}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
    <div>
        Content here
    </div>
</>
*/

export default ContentLayout;
