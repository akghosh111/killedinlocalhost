
import { SignupComponent } from "@/components/Signup"
import { Quote } from "../components/Quote"

export const Signup = () => {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">

            <div>
              <SignupComponent/>
            </div>
            <div className="hidden lg:block">
              <Quote/>
            </div>
            
        </div>
    </div>
  )
}
