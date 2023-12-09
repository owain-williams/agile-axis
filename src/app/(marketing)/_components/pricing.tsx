import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Free</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  1 active project
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  20 Issues per project
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Limited Reporting
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
          <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Popular
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$9</span>/ seat
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                  3 active projects
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  200 Issues per project
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Full Reporting
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Automation Tools
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Enterprise</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">Contact Us</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited active projects
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited Issues per project
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Full Reporting
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Automation Tools
                </li>
                <li className="flex items-center">
                  <Check className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Dedicated Support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
