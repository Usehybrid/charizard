import {Route, Routes} from 'react-router-dom'
import {Error500} from './Error500'
import {Error404} from './Error404'
import {ErrorsLayout} from './ErrorLayout'

export function ErrorsPage({
  isOnly500,
  homeRoute = '/',
}: {
  isOnly500?: boolean
  homeRoute?: string
}) {
  return isOnly500 ? (
    <Routes>
      <Route element={<ErrorsLayout homeRoute={homeRoute} />}>
        <Route index element={<Error500 />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route element={<ErrorsLayout homeRoute={homeRoute} />}>
        <Route path="404" element={<Error404 />} />
        <Route path="500" element={<Error500 />} />
        <Route index element={<Error404 />} />
      </Route>
    </Routes>
  )
}
