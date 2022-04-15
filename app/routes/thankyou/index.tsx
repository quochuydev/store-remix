import { Fragment, useState } from "react";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { CartProvider, useCart } from "~/packages/react-use-cart";
import { ActionFunction, redirect } from "remix";
import { supabase } from "~/utils/supabase.server";

export default function Thankyou() {
  return <div>Thank you for order</div>;
}
