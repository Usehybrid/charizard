import {Route, Routes} from 'react-router-dom'
import {Error500} from './Error500'
import {Error404} from './Error404'
import {ErrorsLayout} from './ErrorLayout'

interface ErrorsPageProps {
  isOnly500?: boolean
  homeRoute?: string
}

export function ErrorsPage({isOnly500, homeRoute = '/'}: ErrorsPageProps) {
  return (
    <Routes>
      <Route element={<ErrorsLayout homeRoute={homeRoute} />}>
        {isOnly500 ? (
          <Route index element={<Error500 />} />
        ) : (
          <>
            <Route path="404" element={<Error404 />} />
            <Route path="500" element={<Error500 />} />
            <Route index element={<Error404 />} />
          </>
        )}
      </Route>
    </Routes>
  )
}
