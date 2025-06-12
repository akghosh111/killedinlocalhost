import { SigninComponent } from "@/components/Signin"
import { Quote } from "../components/Quote"

export const Signin = () => {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">

            <div>
              <SigninComponent/>
            </div>
            <div className="hidden lg:block">
              <Quote/>
            </div>
            
        </div>
    </div>
  )
}
