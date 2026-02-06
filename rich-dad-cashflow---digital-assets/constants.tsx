
import React from 'react';
import { 
  Facebook, 
  Video, 
  MessageSquare, 
  Globe, 
  Heart, 
  Camera, 
  Users, 
  Zap,
  TrendingUp,
  CreditCard,
  Home,
  ShoppingBag
} from 'lucide-react';
import { Category, FinancialItem } from './types';

export const INITIAL_ASSETS: FinancialItem[] = [
  { id: '1', name: 'Kênh Facebook Cá Nhân', value: 5000000, category: Category.ASSET, description: 'Xây dựng thương hiệu cá nhân', link: 'https://facebook.com' },
  { id: '2', name: 'Kết nối Zalo Khách Hàng', value: 8000000, category: Category.ASSET, description: 'Chăm sóc và chốt đơn trực tiếp' },
  { id: '3', name: 'TikTok Luật Hấp Dẫn', value: 3000000, category: Category.ASSET, description: 'Thu hút traffic mục tiêu' },
  { id: '4', name: 'lehongtruong.com', value: 12000000, category: Category.ASSET, description: 'Trang web thương hiệu chính', link: 'https://lehongtruong.com' },
  { id: '5', name: 'Facebook Reels', value: 4500000, category: Category.ASSET, description: 'Video ngắn viral' },
  { id: '6', name: 'Facebook Fanpage', value: 7000000, category: Category.ASSET, description: 'Cộng đồng khách hàng tiềm năng' },
  { id: '7', name: 'Clip Biết Ơn', value: 2000000, category: Category.ASSET, description: 'Giá trị tinh thần & thu hút năng lượng' },
  { id: '8', name: 'Ảnh Gemini AI', value: 1500000, category: Category.ASSET, description: 'Nội dung hình ảnh chất lượng cao' },
  { id: '9', name: 'Mạng lưới Bạn Bè FB', value: 10000000, category: Category.ASSET, description: 'Mối quan hệ kinh doanh' },
];

export const INITIAL_LIABILITIES: FinancialItem[] = [
  { id: 'l1', name: 'Thẻ Tín Dụng', value: 5000000, category: Category.LIABILITY },
  { id: 'l2', name: 'Trả Góp Laptop', value: 2000000, category: Category.LIABILITY },
];

export const INITIAL_EXPENSES: FinancialItem[] = [
  { id: 'e1', name: 'Quảng Cáo FB', value: 3000000, category: Category.EXPENSE },
  { id: 'e2', name: 'Internet & 4G', value: 500000, category: Category.EXPENSE },
  { id: 'e3', name: 'Ăn uống / Giải trí', value: 4000000, category: Category.EXPENSE },
];

export const getIcon = (name: string) => {
  if (name.includes('Facebook') || name.includes('FB')) return <Facebook className="w-5 h-5 text-blue-600" />;
  if (name.includes('Zalo')) return <MessageSquare className="w-5 h-5 text-blue-400" />;
  if (name.includes('TikTok') || name.includes('Clip')) return <Video className="w-5 h-5 text-pink-500" />;
  if (name.includes('lehongtruong')) return <Globe className="w-5 h-5 text-emerald-500" />;
  if (name.includes('Biết Ơn')) return <Heart className="w-5 h-5 text-rose-500" />;
  if (name.includes('Gemini')) return <Camera className="w-5 h-5 text-purple-500" />;
  if (name.includes('Bạn Bè')) return <Users className="w-5 h-5 text-indigo-500" />;
  if (name.includes('Thẻ')) return <CreditCard className="w-5 h-5 text-orange-500" />;
  return <Zap className="w-5 h-5 text-yellow-500" />;
};
