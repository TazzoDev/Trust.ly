import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./authContext"
import Layout from "./components/layouts/Layout"

//pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import AboutUs from "./pages/AboutUs"
import Explore, {loader as exploreLoader} from "./pages/Explore"
import Profile, { ProfilePosts } from "./pages/profile/Profile"
import Post, {loader as postLoader} from "./pages/post/Post"
import ProfilePhotos from "./pages/profile/ProfilePhotos"
import ProfileReviews from "./pages/profile/ProfileReviews"
import EditProfile from "./pages/profile/EditProfile"
import PostEdit from "./pages/post/PostEdit"
import NewPost from "./pages/post/NewPost"
import RequestsLayout from "./components/layouts/RequestsLayout"
import RequestsAccepted from "./pages/requests/RequestsAccepted"
import RequestsHistory from "./pages/requests/RequestsHistory"
import RequestsPending from "./pages/requests/RequestsPending"

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index 
        element={<Home />}
      />
      <Route path="login"
        element={<Login />}
      />
      <Route path="about-us" 
        element={<AboutUs />}
      />
      <Route path="explore" 
        element={<Explore />}
        loader={exploreLoader}
      />
      <Route path="explore/:postId" 
        element={<Post />}
        loader={postLoader}
      />
      <Route path="profile" 
        element={<Profile />} 
      >
        <Route index element={<ProfilePosts />}  />
        <Route path="photos" element={<ProfilePhotos />} />
        <Route path="reviews" element={<ProfileReviews />} />
      </Route>
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path=":postId" element={<Post />} loader={postLoader}/>
      <Route path="edit-post/:postId" element={<PostEdit />} />
      <Route path="new-post" element={<NewPost />} />
      <Route path="requests" element={<RequestsLayout />}>
        <Route index element={<RequestsAccepted />}/>
        <Route path="pending" element={<RequestsPending />}/>
        <Route path="history" element={<RequestsHistory />}/>
      </Route>

    </Route>
  ))


  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
