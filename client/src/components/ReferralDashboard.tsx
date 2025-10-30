import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Users, Copy, TrendingUp, Eye, CheckCircle, XCircle, Check } from 'lucide-react';
import { ReferralCodeWithStats, ReferralStats } from '@shared/schema';

export function ReferralDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [copiedReferral, setCopiedReferral] = React.useState(false);

  const { data: stats } = useQuery<ReferralStats>({
    queryKey: ['/api/referrals/stats'],
    queryFn: async () => {
      const walletAddress = (window as any).walletAddress;
      const response = await fetch('/api/referrals/stats', {
        headers: {
          'x-wallet-address': walletAddress || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
  });

  const { data: codes } = useQuery<ReferralCodeWithStats[]>({
    queryKey: ['/api/referrals/codes'],
    queryFn: async () => {
      const walletAddress = (window as any).walletAddress;
      const response = await fetch('/api/referrals/codes', {
        headers: {
          'x-wallet-address': walletAddress || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch codes');
      return response.json();
    },
  });

  const { data: referralList } = useQuery<any[]>({
    queryKey: ['/api/referrals/list'],
    queryFn: async () => {
      const walletAddress = (window as any).walletAddress;
      const response = await fetch('/api/referrals/list', {
        headers: {
          'x-wallet-address': walletAddress || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch referrals');
      return response.json();
    },
  });

  const toggleCodeMutation = useMutation({
    mutationFn: async (codeId: string) => {
      const walletAddress = (window as any).walletAddress;
      const response = await fetch(`/api/referrals/codes/${codeId}/toggle`, {
        method: 'PUT',
        headers: {
          'x-wallet-address': walletAddress || '',
        },
      });
      if (!response.ok) throw new Error('Failed to toggle code');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/referrals/codes'] });
    },
  });

  const copyToClipboard = (code: string) => {
    const url = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied to clipboard',
      description: url,
    });
  };

  const copyReferralLink = (code: string) => {
    const referralLink = `${window.location.origin}?ref=${code}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard',
    });
    setTimeout(() => setCopiedReferral(false), 2000);
  };


  return (
    <div className="space-y-6">
      {/* Referral Link Section */}
      {codes && codes.length > 0 && (
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Your Referral Link</h3>
              <p className="text-sm text-muted-foreground">
                Share this link to invite others and earn rewards
              </p>
            </div>
            <div className="w-full sm:w-auto flex items-center gap-2">
              <div className="flex-1 sm:flex-none">
                <code className="block px-3 py-2 bg-background rounded-lg text-xs sm:text-sm font-mono break-all border">
                  {window.location.origin}/?ref={codes[0]?.code || 'loading...'}
                </code>
              </div>
              <Button
                onClick={() => codes[0] && copyReferralLink(codes[0].code)}
                variant="outline"
                size="icon"
                className="shrink-0"
                disabled={!codes[0]}
              >
                {copiedReferral ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
              <p className="text-2xl font-bold">{stats?.totalReferrals || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Codes</p>
              <p className="text-2xl font-bold">{stats?.activeReferralCodes || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Eye className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Earnings</p>
              <p className="text-2xl font-bold">${stats?.referralEarnings || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Referral Codes */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Referral Code</h2>
        </div>

        <div className="space-y-3">
          {codes?.map((code) => (
            <div
              key={code.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-mono font-bold text-lg">{code.code}</code>
                  {code.isActive ? (
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <XCircle className="w-3 h-3 mr-1" />
                      Inactive
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {code.referralCount} uses
                  {code.maxUses > 0 && ` / ${code.maxUses} max`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(code.code)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCodeMutation.mutate(code.id)}
                >
                  {code.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>
          ))}

          {(!codes || codes.length === 0) && (
            <p className="text-center text-muted-foreground py-8">
              Your referral code will appear here once your account is set up.
            </p>
          )}
        </div>
      </Card>

      {/* Referred Users */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Referred Users</h2>
        <div className="space-y-3">
          {referralList?.map((referral) => (
            <div
              key={referral.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={referral.referredUser.profileImagePath || undefined} />
                  <AvatarFallback>
                    {referral.referredUser.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">@{referral.referredUser.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(referral.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {referral.referralCode && (
                <Badge variant="outline">Code: {referral.referralCode.code}</Badge>
              )}
            </div>
          ))}

          {(!referralList || referralList.length === 0) && (
            <p className="text-center text-muted-foreground py-8">
              No referrals yet. Share your code to start earning!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}