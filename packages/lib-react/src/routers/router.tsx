// import type { FunctionComponent } from 'react'
// import { LayoutSection, Form, Router, Route } from '@gnowth/lib-react'

// export const FormSplitBill: FunctionComponent = () => {
//   const { serviceSplitBill } = useServices(['serviceSplitBill'])
//   const splitBillQuery = useQuery(serviceSplitBill.keyDetail(), serviceSplitBill.apiDetail, { enabled: !!id })

//   return (
//     <LayoutSection>
//       <Form initialValue={splitBillQuery.data ?? serviceSplitBill.fromPartial()}>
//         <Router name="router-name" layout={{ sm: 'div', md: 'div' }}>
//           <Route name="route-name">items</Route>
//           <Route name="itemx">itemx</Route>
//         </Router>
//       </Form>
//     </LayoutSection>
//   )
// }
