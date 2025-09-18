import { createClient } from '@supabase/supabase-js'

if (!process.env.REACT_APP_SUPABASE_URL) {
  throw new Error('Missing environment variable REACT_APP_SUPABASE_URL')
}

if (!process.env.REACT_APP_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable REACT_APP_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

// Types
export interface Member {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  address: string
  age: number
  interests: string[]
  emergency_contact: string
  medical_conditions?: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Volunteer {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  address: string
  skills: string[]
  availability: string[]
  experience: string
  motivation: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface ContactInquiry {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  message: string
  subject: string
  status: 'new' | 'in_progress' | 'resolved'
}

export interface NewsletterSubscription {
  id: string
  created_at: string
  email: string
  name?: string
  interests?: string[]
  status: 'active' | 'unsubscribed'
}

// Services
export const memberService = {
  async create(member: Omit<Member, 'id' | 'created_at' | 'status'>) {
    const requestId = generateRequestId()
    const { data, error } = await supabase
      .from('members')
      .insert([{ ...member, status: 'pending' }])
      .select()
      .single()

    if (error) throw error
    return { ...data, requestId }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('members')
      .select()
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },
}

export const volunteerService = {
  async create(volunteer: Omit<Volunteer, 'id' | 'created_at' | 'status'>) {
    const requestId = generateRequestId()
    const { data, error } = await supabase
      .from('volunteers')
      .insert([{ ...volunteer, status: 'pending' }])
      .select()
      .single()

    if (error) throw error
    return { ...data, requestId }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('volunteers')
      .select()
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },
}

export const contactService = {
  async create(inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>) {
    const requestId = generateRequestId()
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([{ ...inquiry, status: 'new' }])
      .select()
      .single()

    if (error) throw error
    return { ...data, requestId }
  },
}

export const newsletterService = {
  async subscribe(subscription: Omit<NewsletterSubscription, 'id' | 'created_at' | 'status'>) {
    const requestId = generateRequestId()
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ ...subscription, status: 'active' }])
      .select()
      .single()

    if (error) throw error
    return { ...data, requestId }
  },
}

// Utility functions
export const generateRequestId = () => {
  return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase()
}

export const getDetailedError = (error: any) => {
  if (!error) return 'An unknown error occurred'
  
  if (error.message?.includes('duplicate key')) {
    return 'This email is already registered'
  }
  
  if (error.message?.includes('invalid input syntax')) {
    return 'Invalid input format'
  }
  
  if (error.message?.includes('violates foreign key constraint')) {
    return 'Invalid reference data'
  }
  
  return error.message || 'An error occurred while processing your request'
}

// Supabase Utils for Setup Check
export const supabaseUtils = {
  async testConnection() {
    try {
      const { data, error } = await supabase.from('members').select('count').limit(1)
      
      if (error) {
        if (error.message.includes('authentication failed')) {
          return {
            success: false,
            message: 'Authentication failed - invalid API key',
            needsSetup: true
          }
        }
        return {
          success: false,
          message: error.message,
          needsSetup: false
        }
      }
      
      return {
        success: true,
        message: 'Successfully connected to Supabase'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to connect to Supabase',
        needsSetup: false
      }
    }
  },

  async checkDatabaseSetup() {
    const requiredTables = [
      'members',
      'volunteers',
      'contact_inquiries',
      'newsletter_subscriptions'
    ]

    const results = await Promise.all(
      requiredTables.map(async (table) => {
        try {
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })

          return {
            table,
            exists: !error,
          }
        } catch {
          return {
            table,
            exists: false,
          }
        }
      })
    )

    return results
  }
} 