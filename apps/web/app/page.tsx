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
            content: 'ไม่พบผู้ใช้งานในระบบ',
        });

        return false;
      }

      setLoading(false);
    } catch {
      setLoading(false);

      messageApi.open({
        type: 'error',
        content: 'เกิดข้อผิดพลาดกรุณาติดต่อผู้ดูแลระบบ',
      });
    }
  }

  return (
    <>
      { contextHolder }

      <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
          {/* Floating orbs for decoration */}
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          
          {/* Main content */}
          <div className="relative z-10 w-full max-w-md px-6">
              <div className="animate-fade-in">
                  <Card className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-primary/10 animate-scale-in">
                      <div className="text-center space-y-2">
                          <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                              <Lock className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-2xl mb-8">เข้าสู่ระบบ</p>
                      </div>

                      <Form 
                          layout='vertical'
                          className="mt-4 w-full max-w-full"
                          onFinish={onFinish}
                      >
                          <Form.Item name="username" label="ชื่อผู้ใช้งาน" rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้งาน' }]}>
                              <Input size="large" prefix={<User />} />
                          </Form.Item>
                          <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}>
                              <Input.Password size="large" prefix={<Lock />} />
                          </Form.Item>
                          <Form.Item>
                              <Button className="!bg-secondary !text-white font-bold !border-none mt-4" shape="round" size="large" htmlType="submit" loading={loading}>
                                  เข้าสู่ระบบ
                              </Button>
                          </Form.Item>
                      </Form>
                  </Card>
              </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-200/20 rounded-full blur-lg"></div>
      </div>
    </>
  );
}
