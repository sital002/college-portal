import { navList } from "../../constant/navList";

const Sidebar = () => {
  return (
    <aside className="max-w-3xs sticky left-0 top-0 w-full h-screen bg-white p-3 shadow-md rounded-md">
      <img
        className="w-[50px]"
        src=""
        alt=""
      />
      <div>
        {navList.map((item, index) => {
          return (
            <div
              className="flex items-center gap-x-4 py-4 px-2 cursor-pointer rounded-md hover:bg-blue-500 hover:text-white"
              key={index}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
