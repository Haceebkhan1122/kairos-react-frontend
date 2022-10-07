import {
  AddBulkUsers,
  BulkUserAdd,
  DeliveryModule,
  EmailSetup,
  Home,
  Leasing1,
  MonthlySummary,
  TimeEntry,
} from "./pages";

const authenticatedRoutes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/timeentry",
    element: TimeEntry,
  },
  {
    path: "/timeentry/monthlysummary",
    element: MonthlySummary,
  },
  {
    path: "/timeentry/addbulkusers",
    element: AddBulkUsers,
  },
  {
    path: "/timeentry/bulkuseradd",
    element: BulkUserAdd,
  },
  {
    path: "/timeentry/emailsetup",
    element: EmailSetup,
  },
  {
    path: "/routeplanner",
    element: DeliveryModule,
  },
  {
    path: "/leasing",
    element: Leasing1,
  },
  // {
  //   path: "/leasing1",
  //   element: Leasing,
  // },
];

function withNavigationWatcher(Component, path) {
  // console.log("OUTSIDE WITH NAVIGATION WATCHER");
  const WrappedComponent = function (props) {
    // console.log("INSIDE WITH NAVIGATION WATCHER");
    return <Component {...props} />;
  };
  return <WrappedComponent />;
}
export default authenticatedRoutes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
