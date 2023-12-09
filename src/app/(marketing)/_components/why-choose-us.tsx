import React from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
export function WhyChooseUs({}) {
  return (
    <section className="w-full py-10 md:py-20 lg:py-24 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
          Why Choose ProjectMaster?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Unified Workspace</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Consolidate all your project information and tools in one place,
                making it easier to find and manage.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Collaborative</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Work together with your team in real-time, no matter where they
                are.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Customizable</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Adjust ProjectMaster to fit your needs. Customize your workflow,
                notifications, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
