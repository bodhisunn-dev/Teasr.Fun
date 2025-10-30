
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Heart, MessageCircle, ShoppingCart, User, Check } from 'lucide-react';
import { NotificationWithActor } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useWallet } from '@/lib/wallet';
import { Link } from 'wouter';

export default function Notifications() {
  const { address } = useWallet();

  const { data: notifications = [], refetch } = useQuery<NotificationWithActor[]>({
    queryKey: ['/api/notifications', address],
    queryFn: async () => {
      const walletAddress = (window as any).walletAddress || address || localStorage.getItem('walletAddress');
      if (!walletAddress) {
        return [];
      }
      const response = await fetch('/api/notifications', {
        credentials: 'include',
        headers: {
          'x-wallet-address': walletAddress,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      return await response.json();
    },
    enabled: !!address,
  });

  const { data: unreadCount, refetch: refetchCount } = useQuery<{ count: number }>({
    queryKey: ['/api/notifications/unread-count', address],
    queryFn: async () => {
      const walletAddress = (window as any).walletAddress || address || localStorage.getItem('walletAddress');
      if (!walletAddress) {
        return { count: 0 };
      }
      const response = await fetch('/api/notifications/unread-count', {
        credentials: 'include',
        headers: {
          'x-wallet-address': walletAddress,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notification count');
      }
      return await response.json();
    },
    enabled: !!address,
  });

  const handleMarkAsRead = async (notificationId: string) => {
    await apiRequest('PUT', `/api/notifications/${notificationId}/read`, {});
    refetch();
    refetchCount();
  };

  const handleMarkAllAsRead = async () => {
    await apiRequest('PUT', '/api/notifications/read-all', {});
    refetch();
    refetchCount();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'purchase':
        return <ShoppingCart className="w-5 h-5 text-green-500" />;
      case 'comment_unlock':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'follow':
        return <User className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-20">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-3">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              Please connect your wallet to view notifications
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display mb-2">Notifications</h1>
              {unreadCount && unreadCount.count > 0 && (
                <p className="text-muted-foreground">
                  You have {unreadCount.count} unread notification{unreadCount.count !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {notifications.length > 0 && (
              <Button onClick={handleMarkAllAsRead} variant="outline">
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                When someone interacts with your content, you'll see it here
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 transition-colors ${
                    !notification.isRead ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Link href={`/profile/${notification.actor?.username}`}>
                            <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div>
                            <p className="text-sm">
                              <Link href={`/profile/${notification.actor?.username}`}>
                                <span className="font-semibold hover:underline cursor-pointer">
                                  @{notification.actor?.username}
                                </span>
                              </Link>{' '}
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.createdAt).toLocaleDateString()}{' '}
                              {new Date(notification.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        {!notification.isRead && (
                          <Button
                            onClick={() => handleMarkAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
