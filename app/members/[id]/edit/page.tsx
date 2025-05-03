"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

interface Member {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipType: string
  status: string
  startDate: string
  endDate?: string
}

export default function EditMemberPage() {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState<Member>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "",
    status: "",
    startDate: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMember = async () => {
      try {
        // In a real app, you would fetch from your API
        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock member data
        const mockMember = {
          _id: params.id as string,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          membershipType: "Premium",
          status: "Active",
          startDate: "2023-01-15",
          endDate: "2024-01-15",
        }

        setFormData(mockMember)
      } catch (error) {
        setError("Failed to load member details")
        console.error("Error fetching member:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMember()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, you would call your API to update the member
      // For demo purposes, we'll just simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push(`/members/${params.id}`)
    } catch (error) {
      setError("Failed to update member. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading member details...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/members/${params.id}`} className="text-blue-500 hover:text-blue-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Edit Member</h1>
      </div>

      <div className="card">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="membershipType" className="form-label">
                Membership Type
              </label>
              <select
                id="membershipType"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate.split("T")[0]}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate?.split("T")[0] || ""}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href={`/members/${params.id}`} className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary flex items-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
