

export const metadata = {
 title: {
  default: 'What-about?',
  template: '%s | What-about?'
 },
 description: 'This is the authentication of what about',
};

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default AuthLayout