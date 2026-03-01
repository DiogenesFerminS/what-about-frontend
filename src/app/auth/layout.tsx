import Footer from "@/components/landing/footer";


export const metadata = {
 title: {
  default: 'What-about?',
  template: '%s | What-about?'
 },
 description: 'This is the authentication of what about',
};

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="bg-stone-950">
        {children}
        <Footer/>
    </div>
  )
}

export default AuthLayout