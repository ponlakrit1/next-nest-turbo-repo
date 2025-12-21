"use client"

import { Button, Card, Form, FormProps, Input, message } from "antd";
import { User, Lock } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AuthFieldType = {
  username: string;
  password: string;
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { status } = useSession();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [router, status]);
  
  const onFinish: FormProps<AuthFieldType>['onFinish'] = async (form) => {
    try {
      setLoading(true);

      const result = await signIn('credentials', {
        redirect: false,
        username: form.username,
        password: form.password,
      });

      if (result?.error) {
        setLoading(false);

        messageApi.open({
            type: 'error',
            content: 'User not found',
        });

        return false;
      }

      setLoading(false);
    } catch {
      setLoading(false);

      messageApi.open({
        type: 'error',
        content: 'Error: Internal Error Please Contact Administrator',
      });
    }
  }

  return (
    <>
      { contextHolder }

      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Main content */}
        <div className="w-full max-w-md px-6">
          <div className="animate-fade-in">
            <Card className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-primary/10 animate-scale-in">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>

              <Form 
                layout='vertical'
                className="mt-4 w-full max-w-full"
                onFinish={onFinish}
              >
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter username' }]}>
                  <Input size="large" prefix={<User />} />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
                  <Input.Password size="large" prefix={<Lock />} />
                </Form.Item>
                <Form.Item>
                  <Button className="bg-secondary! text-white! font-bold border-none! mt-4" shape="round" size="large" htmlType="submit" loading={loading}>
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
